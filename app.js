"use strict";
///////////////////////////////////////////
// Data
const currentUser = {
  image: {
    png: "./images/avatars/image-juliusomo.png",
    webp: "./images/avatars/image-juliusomo.webp",
  },
  username: "juliusomo",
};
let comments = [
  {
    id: 1,
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "1 month ago",
    score: 15,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp",
      },
      username: "amyrobson",
    },
    replies: [],
  },
  {
    id: 2,
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: "2 weeks ago",
    score: 1,
    user: {
      image: {
        png: "./images/avatars/image-maxblagun.png",
        webp: "./images/avatars/image-maxblagun.webp",
      },
      username: "maxblagun",
    },
    replies: [
      {
        id: 3,
        content:
          "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        createdAt: "1 week ago",
        score: 2,
        replyingTo: "maxblagun",
        user: {
          image: {
            png: "./images/avatars/image-ramsesmiron.png",
            webp: "./images/avatars/image-ramsesmiron.webp",
          },
          username: "ramsesmiron",
        },
      },
      {
        id: 4,
        content:
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        createdAt: "2 days ago",
        score: 3,
        replyingTo: "ramsesmiron",
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
      },
    ],
  },
];

///////////////////////////////////////////
// Elements
let replyBtn = document.querySelectorAll(".reply-btn");
let sendReplyBtn = document.querySelectorAll(".send-reply");

let plusBtn = document.querySelectorAll(".plus-btn");
let minusBtn = document.querySelectorAll(".minus-btn");
let deleteBtn = document.querySelectorAll(".delete-btn");
let editBtn = document.querySelectorAll(".edit-btn");
let sendBtn = document.querySelector(".send-btn");
let commentTextBox = document.getElementById("text-box");

let currentUserPic = currentUser.image.webp;
let currentUsername = currentUser.username;

let deletePanel = document.querySelector(".delete-panel-container");
let yesDeleteBtn = document.querySelector(".DELETE-btn");
let cancelBtn = document.querySelector(".CANCEL-btn");
let updateBtn = document.querySelectorAll(".update-btn");

/////////////////////////////////
// FUNCTIONS
/////////////////////////////////

// SORTING////////////////////////
function sortComments(comments) {
  comments.sort((a, b) => b.score - a.score);
}
function sortReplies() {
  for (let ri = 0; ri < comments.length; ri++) {
    sortComments(comments[ri].replies);
  }
}
function sortAll() {
  sortComments(comments);
  sortReplies();
}

const arrayId = [];
let i = 0;
function lastId(comments) {
  comments.forEach((comment) => {
    arrayId[i] = Object.values(comment)[0];
    i++;
    comment.replies.forEach((reply) => {
      arrayId[i] = Object.values(reply)[0];
      i++;
    });
  });
  arrayId.sort();
  return arrayId[arrayId.length - 1];
}

function pressEnter(btn, textBox) {
  textBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btn.click();
    }
  });
}

function reload() {
  let replyBtn = document.querySelectorAll(".reply-btn");
  let sendReplyBtn = document.querySelectorAll(".send-reply");
  let sendBtn = document.querySelector(".send-btn");
  let plusBtn = document.querySelectorAll(".plus-btn");
  let minusBtn = document.querySelectorAll(".minus-btn");
  let deleteBtn = document.querySelectorAll(".delete-btn");
  let editBtn = document.querySelectorAll(".edit-btn");
  let commentTextBox = document.getElementById("text-box");

  let currentUserPic = currentUser.image.webp;
  let currentUsername = currentUser.username;

  let deletePanel = document.querySelector(".delete-panel-container");
  let yesDeleteBtn = document.querySelector(".DELETE-btn");
  let cancelBtn = document.querySelector(".CANCEL-btn");
  let updateBtn = document.querySelectorAll(".update-btn");
}

const formatCommentDate = function (date) {
  const calcSecondPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / 1000);
  const calcMinutePassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60));
  const calcHourPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60));
  const calcDayPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const calcMonthPassed = (date1, date2) =>
    Math.round(Math.abs(date2.getMonth() - date1.getMonth()));
  const calcYearPassed = (date1, date2) =>
    Math.round(Math.abs(date2.getFullYear() - date1.getFullYear()));

  const secondsPassed = calcSecondPassed(new Date(), date);
  const minutesPassed = calcMinutePassed(new Date(), date);
  const hoursPassed = calcHourPassed(new Date(), date);
  const daysPassed = calcDayPassed(new Date(), date);
  const monthsPassed = calcMonthPassed(new Date(), date);
  const yearsPassed = calcYearPassed(new Date(), date);

  if (secondsPassed < 60) return "Just now";
  if (minutesPassed < 60) return `${minutesPassed} min ago`;
  if (minutesPassed >= 60) return `${hoursPassed} hour ago`;
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  if (monthsPassed < 12) return `${monthsPassed} year ago`;
  if (monthsPassed >= 12) return `${yearsPassed} year ago`;

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const replyF = function () {
  replyBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      //getting the replying to
      const id = Number(e.target.classList[0]);
      let replyingTo;
      comments.forEach((comment) => {
        if (comment.id === id) {
          replyingTo = comment;
        }
      });
      ///////////////////////////

      const replyTextBoxHTML = `
      <div class="add-comment">
        <div class="user-comment">
          <img src="images/avatars/image-juliusomo.png" alt="profile pic" />
  
          <textarea class="textarea-reply"
            placeholder="Add a reply..."
            name="comment"></textarea>
          <button class="send-reply">REPLY</button>
        </div>
      </div>
      `;
      document
        .querySelector(`.container__${replyingTo.id}`)
        .insertAdjacentHTML("beforeend", replyTextBoxHTML);
      const sendReplyBtn = document.querySelector(".send-reply");
      sendReplyBtn.scrollIntoView();
      const commentTextBox = document.querySelector(".textarea-reply");
      pressEnter(sendReplyBtn, commentTextBox);
      commentTextBox.focus();
      sendReplyBtn.addEventListener("click", function () {
        const reply = {
          id: lastId(comments) + 1,
          content: commentTextBox.value,
          createdAt: formatCommentDate(new Date()),
          score: 0,
          replyingTo: replyingTo.user.username,
          user: {
            image: {
              png: currentUser.image.png,
              webp: currentUser.image.webp,
            },
            username: currentUser.username,
          },
        };
        if (reply.content.trim() !== "") {
          replyingTo.replies.push(reply);
          displayComments(comments);
          commentTextBox.value = "";
        } else {
          alert("Empty field!");
        }
      });
    });
  });
};

function getIdElement(comments, id) {
  let replyingTo;
  comments.forEach((comment) => {
    if (comment.id === id) {
      replyingTo = comment;
    } else {
      comment.replies.forEach((reply) => {
        if (reply.id === id) {
          replyingTo = reply;
        }
      });
    }
  });
  return replyingTo;
}

const deleteF = function () {
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      deletePanel.classList.remove("hidden");
      deletePanel.scrollIntoView();

      // Get the comment user
      const id = Number(e.target.classList[0]);
      let replyingTo = getIdElement(comments, id);
      ////////////////////////
      // Cancel
      cancelBtn.addEventListener("click", function () {
        deletePanel.classList.add("hidden");
      });
      ////////////////////////
      //Delete
      yesDeleteBtn.addEventListener("click", function () {
        comments.forEach((comment, i) => {
          if (comment === replyingTo) {
            comments.splice(i, 1);
            displayComments(comments);
          } else {
            comment.replies.forEach((reply, j) => {
              if (reply === replyingTo) {
                comment.replies.splice(j, 1);
                displayComments(comments);
              }
            });
          }
        });
        deletePanel.classList.add("hidden");
      });
    });
  });
};

const upVoteF = function () {
  plusBtn.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // get the clicked id /////////////////////
      const id = Number(e.target.classList[0]);
      const replyingTo = getIdElement(comments, id);
      ///////////////////////////////////////////

      // getting needed elements
      const counter = document.querySelector(
        `.likes-counter__${replyingTo.id}`
      );
      ///////////////////////////////////////////

      counter.textContent++;
      replyingTo.score = counter.textContent;

      // sortAll(comments);
      displayComments(comments);
    });
  });
};
const downVoteF = function () {
  minusBtn.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // get the clicked id /////////////////////
      const id = Number(e.target.classList[0]);
      const replyingTo = getIdElement(comments, id);
      ///////////////////////////////////////////

      // getting needed elements
      const counter = document.querySelector(
        `.likes-counter__${replyingTo.id}`
      );
      ///////////////////////////////////////////

      counter.textContent--;
      replyingTo.score = counter.textContent;

      // sortAll(comments);
      displayComments(comments);
    });
  });
};

const sendF = function () {
  commentTextBox = document.getElementById("text-box");
  pressEnter(sendBtn, commentTextBox);
  sendBtn.addEventListener("click", function () {
    const comment = {
      id: lastId(comments) + 1,
      content: commentTextBox.value,
      createdAt: formatCommentDate(new Date()),
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
      replies: [],
    };
    if (comment.content.trim() !== "") {
      comments.push(comment);
      displayComments(comments);
      commentTextBox.value = "";
    } else {
      sendBtn.closest("div").classList.add("horizontal-shaking");
    }
  });
};

const editF = function () {
  editBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const id = Number(e.target.classList[0]);
      const clickedUpdateBtn = document.querySelector(`.update-btn__${id}`);

      let replyingTo;
      comments.forEach((comment) => {
        if (comment.id === id) {
          replyingTo = comment;
        } else {
          comment.replies.forEach((reply) => {
            if (reply.id === id) {
              replyingTo = reply;
            }
          });
        }
      });
      clickedUpdateBtn.classList.remove("hidden");
      document
        .querySelector(`.comment-description__${id}`)
        .classList.add("hidden");
      const textBox = document.querySelector(`.text-box-update__${id}`);
      textBox.classList.remove("hidden");
      textBox.textContent = replyingTo.content;
      pressEnter(clickedUpdateBtn, textBox);
      clickedUpdateBtn.addEventListener("click", function () {
        replyingTo.content = textBox.value;
        displayComments(comments);
        clickedUpdateBtn.classList.add("hidden");
      });
    });
  });
};

const containerComments = document.querySelector(".comments");
const displayComments = function (comments) {
  sortAll(comments);
  containerComments.innerHTML = "";
  comments.forEach((comment) => {
    const hideClass =
      currentUser.username === comment.user.username ? "" : "hidden";
    const hideReply =
      currentUser.username === comment.user.username ? "hidden" : "";
    const htmlComment = `
    <div id="${comment.id}" class="container container__${comment.id}">
          <div class="comment">
            <div class="likes-container">
              <button class="${comment.id} btn plus-btn plus-btn__${comment.id}">
                <ion-icon class="${comment.id}  plus-icon plus-icon__${comment.id}  icon" name="add-outline"></ion-icon>
              </button>
              <p class="likes-counter likes-counter__${comment.id}">${comment.score}</p>
              <button class="${comment.id}  btn minus-btn minus-btn__${comment.id} ">
                <ion-icon
                  class="${comment.id}  minus-icon minus-icon__${comment.id} icon"
                  name="remove-outline"
                ></ion-icon>
              </button>
            </div>
            <div class="comment-container">
              <div class="comment-header">
                <div class="contact-info">
                  <img
                    src=${comment.user.image.webp}
                    alt="profile pic"
                  />
                  <p class="username">${comment.user.username}</p>
                  <p class="hidden-you ${hideClass}">you</p>

                  <p class="date">${comment.createdAt}</p>
                </div>
                <div class="btns">
                  <button class="${comment.id} btn delete-btn ${hideClass}">
                    <img src="images/icon-delete.svg" alt="delete icon" />Delete
                  </button>

                  <button class="${comment.id} btn edit-btn ${hideClass}">
                    <img src="images/icon-edit.svg" alt="edit icon" />
                    Edit
                  </button>
                
                  <button class="${comment.id} btn reply-btn  ${hideReply}">
                    <img src="images/icon-reply.svg" alt="reply icon" />Reply
                  </button>
                </div>


              </div>
              <div class="comment-description comment-description__${comment.id}">${comment.content}
              </div>
              <textarea class='text-box-update text-box-update__${comment.id} hidden'
                    placeholder="Add a comment..."
                    name="comment"
              ></textarea>
              <button class="${comment.id}  update-btn update-btn__${comment.id} hidden">UPDATE</button>
            </div>
          </div>
        </div>
`;
    containerComments.insertAdjacentHTML("beforeend", htmlComment);

    if (comment.replies.length != 0) {
      comment.replies.forEach((reply) => {
        const hideClass =
          currentUser.username === reply.user.username ? "" : "hidden";
        const hideReply =
          currentUser.username === reply.user.username ? "hidden" : "";
        const htmlReply = `
              <div id='${reply.id}' class="comment reply reply__${reply.id} ">
                <div class="likes-container">
                  <button class="${reply.id} btn plus-btn plus-btn__${reply.id}">
                    <ion-icon class="${reply.id} plus-icon plus-icon__${reply.id} icon" name="add-outline"></ion-icon>
                  </button>
                  <p class="likes-counter likes-counter__${reply.id}">${reply.score}</p>
                  <button class="${reply.id} btn minus-btn minus-btn__${reply.id}">
                    <ion-icon
                      class="${reply.id} minus-icon minus-icon__${reply.id}  icon"
                      name="remove-outline"
                    ></ion-icon>
                  </button>
                </div>
                <div class="comment-container">
                  <div class="comment-header">
                    <div class="contact-info">
                      <img
                        src=${reply.user.image.webp}
                        alt="profile pic"
                      />
                      <p class="username">${reply.user.username}</p>
                      <p class="hidden-you ${hideClass}">you</p>
                      <p class="date">${reply.createdAt}</p>
                    </div>
                  <div class="btns">
                    <button class="${reply.id} btn delete-btn ${hideClass}">
                      <img class="${reply.id} " src="images/icon-delete.svg" alt="delete icon" />Delete
                    </button>

                    <button class="${reply.id} btn edit-btn ${hideClass}">
                      <img class="${reply.id} " src="images/icon-edit.svg" alt="edit icon" />
                      Edit
                    </button>
                  
                    <button class="${reply.id} btn reply-btn ${hideReply} ">
                      <img class="${reply.id} " src="images/icon-reply.svg" alt="reply icon " />Reply
                    </button>
                  </div>
                  </div>
                  <div class="comment-description comment-description__${reply.id} "><span>@${reply.replyingTo}</span> ${reply.content}
                  </div>
                  <textarea class='text-box-update text-box-update__${reply.id} hidden'
                    placeholder="Add a comment..."
                    name="comment"
                  ></textarea>
                  <button class="${reply.id} update-btn update-btn__${reply.id} hidden">UPDATE</button>
                </div>
              </div>
            `;
        document
          .querySelector(`.container__${comment.id}`)
          .insertAdjacentHTML("beforeend", htmlReply);
      });
    }
  });

  replyBtn = document.querySelectorAll(".reply-btn");
  deleteBtn = document.querySelectorAll(".delete-btn");
  sendBtn = document.querySelector(".send-btn");
  plusBtn = document.querySelectorAll(".plus-btn");
  minusBtn = document.querySelectorAll(".minus-btn");
  editBtn = document.querySelectorAll(".edit-btn");
  replyF();
  deleteF();
  sendF();
  editF();
  upVoteF();
  downVoteF();
};
displayComments(comments);
