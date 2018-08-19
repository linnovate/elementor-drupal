var ControlMediaItemView = elementor.modules.controls.Media.extend({

  openFrame: function() {
    if (!this.frame) {
      this.initFrame();
    }
  },

  /**
	 * Create a media modal select frame, and store it so the instance can be reused when needed.
	 */
  initFrame: function() {
    var fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    // 		fileSelector.setAttribute('multiple', 'multiple');
    fileSelector.onchange = this.select.bind(this);
    fileSelector.click();
  },

  /**
	 * Callback handler for when an attachment is selected in the media modal.
	 * Gets the selected image information, and sets it within the control.
	 */
  select: function(e) {
    this.trigger('before:select');

    var formData = new FormData();

    Object.keys(e.target.files).forEach(fileIndex=>{
      formData.append('file-' + fileIndex, e.target.files[fileIndex]);
    }
    );

    fetch(base_url + '/elementor/upload', {
      method: 'POST',
      enctype: 'multipart/form-data',
      body: formData,
    }).then(res=>res.json()).then(data=>{
      this.setValue(data[0]);

      this.applySavedValue();
      this.trigger('after:select');
    }
    ).catch(error=>console.log(error));

  },

  deleteImage: function(event) {
    event.stopPropagation();

    fetch(base_url + '/elementor/delete_upload/' + this.getControlValue().id, {
      method: 'DELETE',
    }).then(res=>res.json()).then(data=>{
      this.setValue({
        url: '',
        id: ''
      });
      this.applySavedValue();
    }
    ).catch(error=>console.log(error));

  },

  onBeforeDestroy: function() {
    this.$el.remove();
  }
});

elementor.modules.controls.Media = ControlMediaItemView;

var ControlMediaItemViewGallery = elementor.modules.controls.Gallery.extend({

  applySavedValue: function() {
    var images = this.getControlValue()
      , imagesCount = images.length
      , hasImages = !!imagesCount;

    this.$el.toggleClass('elementor-gallery-has-images', hasImages).toggleClass('elementor-gallery-empty', !hasImages);

    var $galleryThumbnails = this.ui.galleryThumbnails;

    $galleryThumbnails.empty();

    this.ui.status.text(elementor.translate(hasImages ? 'gallery_images_selected' : 'gallery_no_images_selected', [imagesCount]));

    if (!hasImages) {
      return;
    }

    this.getControlValue().forEach(function(image) {
      var $thumbnail = jQuery('<div>', {
        'class': 'elementor-control-gallery-thumbnail'
      });

      $thumbnail.css('background-image', 'url(' + image.url + ')');

      $galleryThumbnails.append($thumbnail);
    });
  },

  openFrame: function(action) {
    this.initFrame(action);
  },

  initFrame: function(action) {
    var fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    fileSelector.onchange = this.select.bind(this);
    fileSelector.click();
  },

  menuRender: function(view) {
    view.unset('insert');
    view.unset('featured-image');
  },

  gallerySettings: function(browser) {
    browser.sidebar.on('ready', function() {
      browser.sidebar.unset('gallery');
    });
  },

  /**
	 * Callback handler for when an attachment is selected in the media modal.
	 * Gets the selected image information, and sets it within the control.
	 */
  select: function(e) {
    var formData = new FormData();

    Object.keys(e.target.files).forEach(fileIndex=>{
      formData.append('file-' + fileIndex, e.target.files[fileIndex]);
    }
    );

    fetch('/elementor/upload', {
      method: 'POST',
      enctype: 'multipart/form-data',
      body: formData,
    }).then(res=>res.json()).then(data=>{
      this.setValue(data);
      this.applySavedValue();
    }
    ).catch(error=>console.log(error))

  },

  onBeforeDestroy: function() {
    this.$el.remove();
  },

  resetGallery: function() {
    Promise.all(
    	this.getControlValue().map(function(image) {
		  return fetch('/elementor/delete_upload/' + image.id, {
			method: 'DELETE',
		  }).then(res=>res.json()).then(data=>{
		  }
		  ).catch(error=>console.log(error));
		})
    ).then(data=>{
      this.setValue('');
      this.applySavedValue();
    })
  },

  initRemoveDialog: function() {
    var removeDialog;

    this.getRemoveDialog = function() {
      if (!removeDialog) {
        removeDialog = elementor.dialogsManager.createWidget('confirm', {
          message: elementor.translate('dialog_confirm_gallery_delete'),
          headerMessage: elementor.translate('delete_gallery'),
          strings: {
            confirm: elementor.translate('delete'),
            cancel: elementor.translate('cancel')
          },
          defaultOption: 'confirm',
          onConfirm: this.resetGallery.bind(this)
        });
      }

      return removeDialog;
    }
    ;
  },

  onAddImagesClick: function() {
    this.openFrame(this.hasImages() ? 'add' : 'create');
  },

  onClearGalleryClick: function() {
    this.getRemoveDialog().show();
  },

  onGalleryThumbnailsClick: function() {
    this.openFrame('edit');
  }

});

elementor.modules.controls.Gallery = ControlMediaItemViewGallery;
