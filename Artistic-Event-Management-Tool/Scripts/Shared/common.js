var common = {};

common.ArtisticEventOrder = function () {
    var self = this;
    //observables
    self.Id = ko.observable(null);
    self.EventType = ko.observable(null).extend({ required: true });
    
    //computed

    //methods
    self.updateFromModel = function (model) {
        if (!model) {
            model = {};
        }

        self.Id(model.Id || null);
        self.Name(model.EventType || null);

    };

};