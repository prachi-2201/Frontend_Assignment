
function toggleAnswer(id) {
    var answer = document.getElementById("answer" + id);

    answer.style.display = (answer.style.display === "block" ? "none" : "block");
    var que=document.querySelectorAll(".question");
    que[id-1].style.color="blue"
    
}
