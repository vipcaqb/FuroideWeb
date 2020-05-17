
var ClassicEditor = require( '@ckeditor/ckeditor5-build-classic' );
var SimpleUploadAdapter = require( '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter' );

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ SimpleUploadAdapter],
        toolbar: [],
        simpleUpload: {
            uploadUrl: '/uploads'
        }
    } )
    .catch(error => {
        console.error(error);
    });

alert('ahi');