var app = {
	
    initialize: function() {
        var self = this;
        this.store = new MemoryStore(function() {
            self.renderHomeView();
        });
    },

    renderHomeView: function() {
        $('body').html(this.homeTpl());
    }
};

app.initialize();