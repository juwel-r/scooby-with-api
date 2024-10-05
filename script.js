// Load All Posts ====>>>
const loadAllPost = async (searchPost) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      searchPost ? `?category=${searchPost}` : ""
    }`
  );
  const data = await res.json();
  disPlayAllPost(data.posts);
};

const disPlayAllPost = (posts) => {
  const allPostContainer = document.getElementById("allPost");
  allPostContainer.innerText = "";
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl"
                  >
                    <div class="indicator">
                      <span class="indicator-item badge ${
                        post.isActive ? `bg-green-600` : `bg-gray-500`
                      } "></span>
                      <div class="avatar">
                        <div class="w-24 rounded-xl">
                          <img
                            src=${post.image}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="space-y-4 w-full">
                      <div class="flex gap-4 *:opacity-60">
                        <p>${post.category}</p>
                        <p>${post.author.name}</p>
                      </div>
                      <h3 class="text-2xl font-bold opacity-70">
                      ${post.title}
                      </h3>
                      <p class="opacity-40">${post.description}
                      </p>
                      <hr class="border border-dashed border-gray-300" />
                      <div
                        class="flex justify-between *:font-bold [&amp;>*:not(:last-child)]:opacity-45"
                      >
                        <div class="flex gap-4">
                          <div class="space-x-2 flex items-center">
                            <i class="fa-regular fa-comment-dots" aria-hidden="true"></i>
                            <p>${post.comment_count}</p>
                          </div>
                          <div class="space-x-2 flex items-center">
                            <i class="fa-regular fa-eye" aria-hidden="true"></i>
                            <p>${post.view_count}</p>
                          </div>
                          <div class="space-x-2 flex items-center">
                            <i class="fa-regular fa-clock" aria-hidden="true"></i>
                            <p>${post.posted_time}</p>
                          </div>
                        </div>
                        <div class="opacity-100">
                          <button
                            id="addToList"
                            onclick="markAsRead('${post.description}', '${
      post.view_count
    }')"
                            class="addToList btn btn-circle bg-green-500 btn-sm"
                          >
                            <i
                              class="fa-solid fa-envelope-open text-white"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
        `;
    allPostContainer.appendChild(div);
  });
};
const markAsRead = (description, viewCount) => {
  let counter = document.getElementById("markAsReadCounter");
  counter.innerText = parseInt(counter.innerText) + 1;
  const markAsReadcontainer = document.getElementById("markAsReadContainer");
  const div = document.createElement("div");
  div.classList = "flex bg-white p-4 rounded-xl justify-between gap-4";
  div.innerHTML = `
    <p>${description}</p>
                  <p class="text-nowrap space-x-1"><i class="fa-regular fa-eye" aria-hidden="true"></i><span>${viewCount}</span></p>
    
    `;
  markAsReadcontainer.appendChild(div);
};
const searchByCategory = () => {
  loadAllPost(document.getElementById("searchPosts").value);
};

const loadLatestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  displayLatestPost(data);
};

const displayLatestPost = async (latestPosts) => {
  const latestPostContainer = document.getElementById("latest-post-container");
  latestPosts.forEach((posts) => {
    const div = document.createElement("div");
    div.classList = "card lg:w-96 pb-5 bg-base-100 shadow-2xl";
    div.innerHTML = `
        <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
                  <img src=${posts.cover_image} alt="" />
                </figure>
                <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
                  <p class="opacity-50 text-start">
                    <i class="fa-solid fa-calendar-days me-2"></i
                    >${posts.author.posted_date ? `${posts.author.posted_date}` : "No Publish Date"}
                  </p>
                  <h2 class="card-title text-start">${posts.title}</h2>
                  <p class="text-start">${posts.description}</p>
                  <div class="card-actions flex gap-5 items-center">
                    <div class="avatar">
                      <div
                        class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                        <img src=${posts.profile_image} alt="" />
                      </div>
                    </div>
                    <div>
                      <h3 class="text-start font-extrabold">${posts.author.name}</h3>
                      <p class="text-start opacity-60">${posts.author.designation ? `${posts.author.designation}` : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
        `;
    latestPostContainer.appendChild(div);
  });
};

loadAllPost();
loadLatestPost();
