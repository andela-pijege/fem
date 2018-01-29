import moxios from 'moxios';
import { setSearchTerm, addAPIData, getAPIDetails } from "../actionCreators";

const strangerThings = {
    "title": "Black Mirror",
    "year": "2011–",
    "description": "A television anthology series that shows the dark side of life and technology.",
    "poster": "bm.jpg",
    "imdbID": "tt2085059",
    "trailer": "jDiYGjp5iFg",
    "rating": "8.6"
};

test('setSearchTerm', () => {
    expect(setSearchTerm('New York')).toMatchSnapshot();
});

test('addAPIData', () => {
    expect(
        addAPIData(strangerThings)
    ).toMatchSnapshot();
});

test('getAPIDetails', (done) => {
    const dispatchMock = jest.fn()
    moxios.withMock(() => {
        getAPIDetails(strangerThings.imdbID)(dispatchMock);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: strangerThings
                })
                .then(() => {
                    expect(request.url).toEqual(`http://localhost:3000/${strangerThings.imdbID}`);
                    expect(dispatchMock).toBeCalledWith(addAPIData(strangerThings));
                    done();
                })
        })
    })
});

