angular.module('datepickerValidations', ['ngMaterial', 'ngMessages']).controller('AppCtrl', function() {
    this.myDateDeb = new Date('MM-DD-YYYY');
    this.myDateFin = new Date('MM-DD-YYYY');


    this.myDate = (new Date()).now();

    this.minDate = new Date(
        this.myDate.getFullYear(),
        this.myDate.getMonth() - 2,
        this.myDate.getDate()
    );

    this.maxDate = new Date(
        this.myDate.getFullYear(),
        this.myDate.getMonth() + 2,
        this.myDate.getDate()
    );

    this.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    };
});