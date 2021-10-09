function SortArrayAsc(x, y) {
    if (x.Name < y.Name) { return -1; }
    if (x.Name > y.Name) { return 1; }
    return 0;
}
function SortArrayDes(x, y) {
    if (x.Category < y.Category) { return 1; }
    if (x.Category > y.Category) { return -1; }
    return 0;
}
const sortName = (objectsList) => {
    let objects = objectsList;
    let sortedObject = objects.sort(SortArrayAsc)

    return sortedObject;
}
const sortCategory = (objectsList) => {
    let objects = objectsList;
    let sortedObject = objects.sort(SortArrayDes)

    return sortedObject;
}
const nameStartsWith = (objectsList, name) => {
    let objects = objectsList;
    let newObjectsList = [];

    objects.forEach(object => {
        if (object.Name.toLowerCase().startsWith(name.toLowerCase()))
            newObjectsList.push(object);
    });
    return newObjectsList;
}
const searchByName = (objectsList, name) => {
    let objects = objectsList;
    let newObjects = [];

    objects.forEach(object => {
        if (object.Name.toLowerCase() == name.toLowerCase())
            newObjects.push(object);
    })

    return newObjects;
}
const searchByCategory = (objectsList, category) => {
    let objects = objectsList;
    let newObjects = [];

    objects.forEach(object => {
        if (object.Category.toLowerCase() == category.toLowerCase())
            newObjects.push(object);
    })

    return newObjects;
}
const process = (objectsList, params) => {

    let newObjectsList = objectsList;

    if ('sort' in params) {

        if ('name' in params) {

            if ('category' in params) {

                if(params.name.slice(-1) == '*'){
                    newObjectsList = nameStartsWith(newObjectsList, params.name.slice(0, -1));
                }else{
                    newObjectsList = searchByName(newObjectsList, params.name)
                }

                newObjectsList = searchByCategory(newObjectsList, params.category);

                switch (params.sort) {
                    case 'name':
                        newObjectsList = sortName(newObjectsList);
                        break;
                    case 'category':
                        newObjectsList = sortCategory(newObjectsList);
                        break;
                }
            }
            else {

                if(params.name.slice(-1) == '*'){
                    newObjectsList = nameStartsWith(newObjectsList, params.name.slice(0, -1));
                }else{
                    console.log('no');
                    newObjectsList = searchByName(newObjectsList, params.name)
                }

                switch (params.sort) {
                    case 'name':
                        newObjectsList = sortName(newObjectsList);
                        break;
                    case 'category':
                        newObjectsList = sortCategory(newObjectsList);
                        break;
                }
            }
        }
        else {

            switch (params.sort) {
                case 'name':
                    newObjectsList = sortName(newObjectsList);
                    break;
                case 'category':
                    newObjectsList = sortCategory(newObjectsList);
                    break;
            }
        }

    } else if ('name' in params) {

        if ('category' in params) {

            if(params.name.slice(-1) == '*'){
                newObjectsList = nameStartsWith(newObjectsList, params.name.slice(0, -1));
            }else{
                newObjectsList = searchByName(newObjectsList, params.name)
            }

            newObjectsList = searchByCategory(newObjectsList, params.category);
        }
        else {
            if(params.name.slice(-1) == '*'){
                newObjectsList = nameStartsWith(newObjectsList, params.name.slice(0, -1));
            }else{
                newObjectsList = searchByName(newObjectsList, params.name)
            }
        }
    } else if ('category' in params) {
        newObjectsList = searchByCategory(newObjectsList, params.category);
    }

    return newObjectsList;
}

module.exports = { sortName, sortCategory, nameStartsWith, searchByName, searchByCategory, process }