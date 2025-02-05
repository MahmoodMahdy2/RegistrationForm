import _ from 'lodash'

export function pagination(studentList, pageNumber, pageSize){
    const startIndex = (pageNumber - 1) * pageSize;
    return _(studentList).slice(startIndex).take(pageSize).value();
}