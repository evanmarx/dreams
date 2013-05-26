var DJ = (function () {

	// 
	// Dream
	// 

	function Dream(id, story) {
		this.id = id;
		this.story = story;
	};

	// !!!!!  sort of working  !!!!!!
	Dream.prototype.save = function() {
		var that = this;

		$.post("/dreams.json", {
			dream: {
				id: that.id,
				story: that.story
			}
		},
			function (response) {
				that.id = response.id;
				Dream.all.push(that);

				_(Dream.callbacks).each(function (callback) {
					callback();
			});
		});
	};


	Dream.all = []
	Dream.callbacks = []

	Dream.fetchAll = function() {
		$.getJSON(
			"/dreams.json",
			function(data) {
				Dream.all = [];

				_.each(data, function(datum) {
					Dream.all.push(new Dream(datum.id, datum.story));
				});

				_(Dream.callbacks).each(function(callback) {
					callback();
				});

			}
		);
	};



	// 
	// DreamView
	// 

	function dreamView(item) {
		var that = this;
		that.$item = $(item);

		Dream.callbacks.push(function() {
			that.render();
		})
	}

	dreamView.prototype.render = function () {
		var that = this;

		var ul = $("<ul></ul>");

		_.each(Dream.all, function (dream) {
			ul.append($("<li></li>").text(dream.story));
		});

		that.$item.html(ul);
	};

	// 
	// dreamFormView
	// 
	
	function dreamFormView(textArea, button, callback) {
		this.$textArea = $(textArea);
		this.$button = $(button);
		this.callback = callback;
	}


	dreamFormView.prototype.bind = function() {
		var that = this;

		that.buttonClickHandler = function() {
			that.submit();
		};

		that.$button.click(that.buttonClickHandler());

		// that.$button.click(fucntion {
		// 	that.buttonClickHandler();
		// });
	};

	dreamFormView.prototype.submit = function() {
		var that = this;

		var newDream = new Dream(null, that.$textArea.val());
		that.$textArea.val("");

		that.callback(newDream);
	};

	// 
	// return
	// 

	return {
		Dream: Dream,
		dreamView: dreamView,
		dreamFormView : dreamFormView
	}

})();









