const item = [
    {
        "name": 'Home',
        'id': 1,
        'parent': 0,
        'link': '/',
        'isOpened': true,
        'isSelected': true,
        'icon': 'Home'
    },
    {
        'name': 'Watch later',
        'id': 6,
        'parent': 0,
        'link': '/watchlater',
        'isOpened': false,
        'isSelected': false,
        'icon': 'Later'
    },
    {
        'name': 'Subscription',
        'id': 9,
        'parent': 0,
        'link': '/Subscription',
        'isOpened': false,
        'isSelected': false,
        'icon': 'Subscribe'
    },
    {
        'name': 'Settings',
        'id': 10,
        'parent': 0,
        'link': '/Settings',
        'isOpened': false,
        'isSelected': false,
        'icon': 'Settings'
    },
]



const navItemReducer = (
    state = {item: item},
    action
) => {
    const middle = state.item
    switch (action.type) {
        case "OpenItem":  
            middle[action.payload].isOpened = !middle[action.payload].isOpened;
            return {
            ...state,
        }
        case "SelectItem":
            middle.map(item => item.isSelected = false );  
            middle[action.payload].isSelected = true;
            if (middle[action.payload].parent) middle.map(item => item.id === middle[action.payload].parent ? item.isSelected = true : null)
            return {
            ...state,
        }
        default:
            return state
    }
}

export default navItemReducer;