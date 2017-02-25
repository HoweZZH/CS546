(function($) {
    // Let's start writing AJAX calls!
    var NewItemForm = $("#new-item-form"),
        noteTitle = $("#new-note-title"),
        noteSummary = $("#new-note-summary"),
        noteDue = $("#new-note-due"),
        noteBody = $("#new-note-body");

    NewItemForm.submit(function(event) {

        event.preventDefault();
        var newNoteTitle = noteTitle.val();
        var newNoteSummary = noteSummary.val();
        var newNoteDue = noteDue.val();
        var newNoteBody = noteBody.val();
        var newContent = $("#new-content");

        if (!newNoteTitle || !newNoteSummary || !newNoteDue || !newNoteBody) {
            // console.log('alert');
            $('#alert').removeClass('hidden');
            return;
        }
        var requestConfig = {
            method: "POST",
            url: "/new",
            contentType: 'application/json',
            data: JSON.stringify({
                title: newNoteTitle,
                summary: newNoteSummary,
                due: newNoteDue,
                body: newNoteBody
            })
        };
        $.ajax(requestConfig).then(function(responseMessage) {
            window.location.href = "http://localhost:3000/" + responseMessage.id;
        });
    });

    let nextButtom = $('#nextBtn');
    let title = $('#noteTitle');
    let dueDate = $('#dueDate');
    let summary = $('#noteSummary');
    let body = $('#noteBody');
    let id = $('#noteId');

    nextButtom.click(() => {
        var re = /[0-9]+/;
        //var found = str.match(re);
        console.log(id.text().match(re)[0]);
        
        var requestConfig = {
            method: "POST",
            url: "/nextNote",
            contentType: 'application/json',
            data: JSON.stringify({
                id: parseInt(id.text().match(re)[0])
            })
        };
        $.ajax(requestConfig).then(function(res) {
            // console.log("ajax: ", res);
            title.text("Title: " + res.title);
            dueDate.text("Due Date: " + res.due_date);
            summary.html("Summary: " + res.summary);
            body.html('Body: ' + res.body);
            id.text("Note ID: " + res.id);
        });
    })
})(window.jQuery);

