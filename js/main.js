var app = {


    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    route: function () {
        var hash = window.location.hash;
        this.showAlert("App detail  url = " + hash, "route");
        var match = hash.match(app.detailsURL);
        this.showAlert("match = " + match, "route");
        if (match) {
            this.showAlert("Inside of if(match)", "route");
            this.store.findById(Number(match[1]), function (employee) {
                $('body').html(new EmployeeView(employee).render().el);
            });
            return;
        }

        this.showAlert("Showing HomeView", "route");

        // Always want to make sure something shows on the page
        $('body').html(new HomeView(this.store).render().el);
    },

    registerEvents: function () {
        var self = this;

        // Check of browser supports touch events . . .
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // If yes: register touch event listen to change the "selected" state of the item
            $('body').on('touchstart', 'a', function (event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function (event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // if not: register mouse events instead
            $('body').on('mousedown', 'a', function (event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function (event) {
                $(event.target).removeClass('tappable-active');
            });
        }

        $(window).on('hashchange', $.proxy(this.route, this));
    },

    initialize: function () {
        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.store = new MemoryStore(function () {
            self.route();
        });

        self.registerEvents();
    }
};

app.initialize();
