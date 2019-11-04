import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchSubjectsSuccess = ( subjects ) => {
    return {
        type: actionTypes.FETCH_SUBJECTS_SUCCESS,
        subjects: subjects
    };
};

export const fetchSubjectsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_SUBJECTS_FAIL,
        error: error
    };
};

export const fetchSubjectsStart = () => {
    return {
        type: actionTypes.FETCH_SUBJECTS_START
    };
};

export const fetchSubjects = () => async dispatch => {
    dispatch(fetchSubjectsStart());

    const res = await axios.get( '/api/fetch_subjects' );

    // console.log(res.data);

    if (res.data.subjects) {
        const fetchedSubjects = [...res.data.subjects];

        const sortSubjects = 
        fetchedSubjects.sort(function(a, b){
            if(a.title < b.title) { return -1; }
            if(a.title > b.title) { return 1; }
            return 0;
        });

        dispatch(fetchSubjectsSuccess(sortSubjects));
    } else {
        dispatch(fetchSubjectsFail(res.data));
    }

};

//Increase subject view count and set clicked Subject

export const updateClickedSubject = ( clickedSubject ) => {
    return {
        type: actionTypes.UPDATE_CLICKED_SUBJECT,
        clickedSubject: clickedSubject,
    };
};

export const increaseViews = ( id, views, clickedSubject ) => {
    return dispatch => {
        dispatch(updateClickedSubject( clickedSubject ));
        const subject = {
            subjectId: id,
            subjectViews: views + 1
        };

        //console.log(subject);

        axios.post('/api/subjectviews', subject)
        .then(res => {
            //console.log(res.data);
        })
        .catch(error => {console.log(error)}
        );
    }
};


//Set resources page content type to all, youtube, mooc, or books

export const setActiveContentType = ( platform ) => {
    return {
        type: actionTypes.SET_ACTIVE_CONTENT_TYPE,
        platform: platform
    }
}

//Set selected category to either business, technology, creative, lifeStyle

export const setSelectedCategory = ( category ) => {
    return {
        type: actionTypes.SET_SELECTED_CATEGORY,
        category: category
    }
}

// set liked resource

export const setLikedResource = ( id ) => {
    return {
        type: actionTypes.SET_LIKED_RESOURCE,
        id: id
    }
}

// store visitor recently viewed resources

export const updateAuthOnVisitorView = ( updatedViewed ) => {
    return {
        type: actionTypes.UPDATE_AUTH_ON_VISITOR_VIEW,
        updatedViewed: updatedViewed
    }
}

export const storeVisitorViews = ( id, recentlyViewed ) => dispatch => {
    // console.log("action reached" );
    if (recentlyViewed.length === 0) {

        
        let viewed = [id];
        localStorage.setItem("viewed", viewed);
        dispatch(updateAuthOnVisitorView(viewed));
        // console.log("action reached: case = 0", viewed );
    } else if (recentlyViewed.length > 0 && recentlyViewed.length < 10) {
        
        let checkInViewed = recentlyViewed.find(view => view === id);
        // console.log(!checkInViewed, checkInViewed);
        
        if (!checkInViewed) {
            // let updatedViewed = [...recentlyViewed, id];
            
            let temp = recentlyViewed;

            temp.push(id);

            const updatedViewed = temp;

            localStorage.setItem("viewed", updatedViewed);
            dispatch(updateAuthOnVisitorView(updatedViewed));
            // console.log("action reached: case < 10", id, updatedViewed );
        } else {
            return;
        }
        
    } else if (recentlyViewed.length === 10) {
       
        let checkInViewed = recentlyViewed.find(view => view === id);
        // console.log(!checkInViewed, checkInViewed);

        if(!checkInViewed) {
            
            let temp = recentlyViewed;

            temp.shift();

            temp.push(id);

            const updatedViewed = temp;

            localStorage.setItem("viewed", updatedViewed);
            dispatch(updateAuthOnVisitorView(updatedViewed));
            // console.log("action reached: case = 10", id, updatedViewed );
        }
        
    }
};

// fetch explore recently viewed
export const fetchExploreRecentlyViewedStart = () => ({
    type: actionTypes.FETCH_EXPLORE_RECENTLY_VIEWED_START
});

export const fetchExploreRecentlyViewedSuccess = (resources) => ({
    type: actionTypes.FETCH_EXPLORE_RECENTLY_VIEWED_SUCCESS,
    resources: resources
});

export const fetchExploreRecentlyViewed = (recentlyViewedIds) => async dispatch => {
    dispatch(fetchExploreRecentlyViewedStart());

    const res = await axios.get('/api/fetch_recently_viewed_resources', {params: {ids: recentlyViewedIds}});

    if (res.data.resources) {
        dispatch(fetchExploreRecentlyViewedSuccess(res.data.resources));
    }
}

//  fetch explore latest in spec

export const fetchExploreLatestInSpecStart = () => ({
    type: actionTypes.FETCH_EXPLORE_LATEST_IN_SPEC_START
});

export const fetchExploreLatestInSpecSuccess = (resources) => ({
    type: actionTypes.FETCH_EXPLORE_LATEST_IN_SPEC_SUCCESS,
    resources: resources
});

export const fetchExploreLatestInSpec = (userSpec) => async dispatch => {
    dispatch(fetchExploreLatestInSpecStart());

    const res = await axios.get('/api/fetch_latest_in_spec_resources', {params: {skill: userSpec}});

    if (res.data.resources) {
        dispatch(fetchExploreLatestInSpecSuccess(res.data.resources));
    }
}

// fetch popular in spec

export const fetchExplorePopularInSpecStart = () => ({
    type: actionTypes.FETCH_EXPLORE_POPULAR_IN_SPEC_START
});

export const fetchExplorePopularInSpecSuccess = (resources) => ({
    type: actionTypes.FETCH_EXPLORE_POPULAR_IN_SPEC_SUCCESS,
    resources: resources
});

export const fetchExplorePopularInSpec = (userSpec) => async dispatch => {
    dispatch(fetchExplorePopularInSpecStart());

    const res = await axios.get('/api/fetch_popular_in_spec_resources', {params: {skill: userSpec}});

    if (res.data.resources) {
        dispatch(fetchExplorePopularInSpecSuccess(res.data.resources));
    }
}

export const resetExploreState = () => ({
    type: actionTypes.RESET_EXPLORE_STATE
});
