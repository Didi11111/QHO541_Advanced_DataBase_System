function deleteComment(commentId) {
    fetch(`/comment/${commentId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        location.reload(); // Reload the page to reflect the deletion
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
    });
}
