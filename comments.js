 function getYouTubeInfo() {
        $.ajax({
                url: "https://gdata.youtube.com/feeds/api/videos/UF8uR6Z6KLc?v=2&alt=json",
                dataType: "jsonp",
                success: function (data) { parseresults(data); }
        });
}

function parseresults(data) {
        var title = data.entry.title.$t;
        // /alert(title);
        var description = data.entry.media$group.media$description.$t;
        var viewcount = data.entry.yt$statistics.viewCount;
        var author = data.entry.author[0].name.$t;
        $('#title').html(title);
        $('#description').html('<b>Description</b>: ' + description);
        $('#extrainfo').html('<b>Author</b>: ' + author + '<br/><b>Views</b>: ' + viewcount);
        getComments(data.entry.gd$comments.gd$feedLink.href + '&max-results=50&alt=json', 1);
}

function getComments(commentsURL, startIndex) {
        $.ajax({
                url: commentsURL + '&start-index=' + startIndex,
                dataType: "jsonp",
                success: function (data) {
                        $.each(data.feed.entry, function(key, val) {
                                $('#comments').append('<br/>Author: ' + $(data.feed.entry).size() + ', Comment: ' + val.content.$t);
                        });
                        //alert($(data.feed.entry).size());
                        if ($(data.feed.entry).size() >= 48) { getComments(commentsURL, startIndex + 50); }
                }
        });
}

$(document).ready(function () {
        getYouTubeInfo();
});