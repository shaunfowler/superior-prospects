angular.module('app')

.filter('niceDate', function () {
    return function (date, type) {
        switch (type) {
            case 'dmy1':
                return moment.utc(date).format('MMMM Do, YYYY');
            case 'd':
                return moment.utc(date).format('D');
            case 'y':
                return moment.utc(date).format('YY');
            case 'mmm':
                return moment.utc(date).format('MMM');
        }
    };
})

.filter('uppercase', function () {
    return function (text) {
        return text.toUpperCase();
    };
})

.filter('images', function () {
    return function (items) {
        if (!items.$resolved) {
            return;
        }
        var filtered = [];
        angular.forEach(items, function (item) {
            if (item.fileName.toLowerCase().endsWith('.png')
                || item.fileName.toLowerCase().toLowerCase().endsWith('.jpg')
                || item.fileName.toLowerCase().endsWith('.jpeg')
                || item.fileName.toLowerCase().endsWith('.gif')) {
                filtered.push(item);
            }
        });
        return filtered;
    };
})

.filter('documents', function () {
    return function (items) {
        if (!items.$resolved) {
            return;
        }
        var filtered = [];
        angular.forEach(items, function (item) {
            if (item.fileName.toLowerCase().endsWith('.pdf')
                || item.fileName.toLowerCase().endsWith('.xls')
                || item.fileName.toLowerCase().endsWith('.xlsx')) {
                filtered.push(item);
            }
        });
        return filtered;
    };
})

.filter('mediaIcon', [function () {
    return function (fileType) {
        switch (fileType) {
            case 'xls':
            case 'xlsx':
                return 'fa-file-excel-o';
            case 'pdf':
                return 'fa-file-pdf-o';
            case 'doc':
                return 'fa-file-word-o';
            default:
                return 'fa-file-text-o';
        }
    };
}]);