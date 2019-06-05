import * as actionTypes from './actionTypes';
import axios from 'axios';

function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Fetch clicked subject with path and study topics && fetch all Resources Dispatches

export const fetchClickedSubjectSuccess = ( clickedSubject ) => {
    return {
        type: actionTypes.FETCH_CLICKEDSUBJECT_SUCCESS,
        clickedSubject: clickedSubject
    };
};

export const fetchClickedSubjectFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CLICKEDSUBJECT_FAIL,
        error: error
    };
};

export const fetchClickedSubjectStart = () => {
    return {
        type: actionTypes.FETCH_CLICKEDSUBJECT_START
    };
};

export const fetchAllStart = () => {
    return {
        type: actionTypes.FETCH_ALL_START
    }
}

export const fetchAllSuccess = ( resources ) => {
    return {
        type: actionTypes.FETCH_ALL_SUCCESS,
        resources: resources 
    }
}

export const fetchAllFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_ALL_FAILED,
        error: error 
    }
}


// Fetch all resources and fetch subject path and study topic actions

// Accounting

export const fetchAccounting = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/accounting')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllAccounting = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_accounting');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Animation

export const fetchAnimation = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/animation')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllAnimation = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_animation');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Architecture

export const fetchArchitecture = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/architecture')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllArchitecture = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_architecture');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Audio

export const fetchAudio = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/audio')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllAudio = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_audio');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Beauty

export const fetchBeauty = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/beauty')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllBeauty = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_beauty');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Cloud

export const fetchCloud = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/cloud')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllCloud = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_cloud');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Communication

export const fetchCommunication = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/communications')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllCommunication = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_communications');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Customer

export const fetchCustomer = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/customer')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllCustomer = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_customer');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Data

export const fetchData = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/data')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllData = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_data');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Database

export const fetchDatabase = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/database')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllDatabase = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_database');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Drawing

export const fetchDrawing = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/drawing')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllDrawing = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_drawing');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Fashion

export const fetchFashion = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/fashion')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllFashion = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_fashion');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Food

export const fetchFood = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/food')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllFood = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_food');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Gamedesign

export const fetchGamedesign = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/gamedesign')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllGamedesign = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_gamedesign');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Gamedev

export const fetchGamedev = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/gamedev')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllGamedev = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_gamedev');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Gaming

export const fetchGaming = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/gaming')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllGaming = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_gaming'); 

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Graphics

export const fetchGraphics = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/graphics')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllGraphics = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_graphics');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Hardware

export const fetchHardware = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/hardware')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllHardware = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_hardware');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Health

export const fetchHealth = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/health')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllHealth = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_health');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Home

export const fetchHome = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/home')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllHome = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_home');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Interface

export const fetchInterface = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/interface')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllInterface = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_interface');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Interior

export const fetchInterior = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/interior')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllInterior = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_interior');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Management

export const fetchManagement = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/management')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllManagement = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_management');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Marketing

export const fetchMarketing = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/marketing')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllMarketing = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_marketing');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Mobile

export const fetchMobile = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/mobile')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllMobile = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_mobile');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Modesign

export const fetchModesign = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/modesign')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllModesign = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_modesign');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Music

export const fetchMusic = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/music')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllMusic = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_music');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Network

export const fetchNetwork = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/network')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllNetwork = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_network');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Painting

export const fetchPainting = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/painting')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllPainting = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_painting');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// PersonalDev

export const fetchPersonalDev = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/personal_dev')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllPersonalDev = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_personal_dev');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Pet

export const fetchPet = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/pet')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllPet = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_pet');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Photography

export const fetchPhotography = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/photography')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllPhotography = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_photography');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// ProfDev

export const fetchProfDev = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/prof_dev')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllProfDev = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_prof_dev');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// RealEstate

export const fetchRealEstate = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/real_estate')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllRealEstate = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_real_estate');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Software

export const fetchSoftware = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/software')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllSoftware = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_software');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// StudySkill

export const fetchStudySkill = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/study_skill')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllStudySkill = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_study_skill');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// TeachingSkill

export const fetchTeachingSkill = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/teaching_skill')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllTeachingSkill = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_teaching_skill');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Travel

export const fetchTravel = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/travel')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllTravel = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_travel');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Video

export const fetchVideo = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/video')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllVideo = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_video');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// WebDesign

export const fetchWebDesign = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/web_design')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllWebDesign = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_web_design');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Webdev

export const fetchWebdev = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/webdev')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllWebdev = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_webdev');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

// Writing

export const fetchWriting = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/writing')
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchAllWriting = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_writing');

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

