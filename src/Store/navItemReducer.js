const item = [
    {
        "name": 'Management',
        'id': 1,
        'parent': 0,
        'link': '#',
        'isOpened': true,
        'isSelected': true,
        'icon': 'Management'
    },
    {
        'name': 'Folder CRUD',
        'id': 2,
        'parent': 1,
        'link': 'foldercrud',
        'isOpened': false,
        'isSelected': false,
        'icon': null
    },
    {
        'name': 'Folder Tree',
        'id': 3,
        'parent': 1,
        'link': 'folder',
        'isOpened': false,
        'isSelected': false,
        'icon': null
    },
    {
        'name': 'Old CRUD',
        'id': 4,
        'parent': 1,
        'link': 'crud',
        'isOpened': false,
        'isSelected': false,
        'icon': null
    },
    {
        'name': 'Financial',
        'id': 6,
        'parent': 0,
        'link': '#',
        'isOpened': false,
        'isSelected': false,
        'icon': 'Financial'
    },
    {
        'name': 'Salary',
        'id': 7,
        'parent': 6,
        'link': 'Salary',
        'isOpened': false,
        'isSelected': false,
        'icon': null
    },
    {
        'name': 'Expenses',
        'id': 8,
        'parent': 6,
        'link': 'Expenses',
        'isOpened': false,
        'isSelected': false,
        'icon': null
    },
    {
        'name': 'News',
        'id': 9,
        'parent': 0,
        'link': 'News',
        'isOpened': false,
        'isSelected': false,
        'icon': 'News'
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