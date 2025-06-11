document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("inputModal");
    const editBtn = document.getElementById("editBtn");
    modal.style.display = "flex"; // 처음 열기 (입력 강제)

    document.getElementById('addProjectBtn').addEventListener('click', () => {
        addProjectInputGroup();
    });

    document.getElementById('submitBtn').addEventListener('click', () => {
        submitUserInfo();
    });

    editBtn.addEventListener('click', () => {
        // 모달 열고 현재 내용 폼에 채우기
        fillFormWithCurrentData();
        modal.style.display = "flex";
        editBtn.style.display = "none";
    });
});

// 프로젝트 입력 그룹 추가 함수
function addProjectInputGroup(title = "", desc = "", link = "") {
    const projectsInput = document.getElementById('projects-input');
    const newGroup = document.createElement('div');
    newGroup.className = 'project-input-group';

    newGroup.innerHTML = `
        <input type="text" class="projTitle" placeholder="프로젝트 제목" value="${title}" />
        <input type="text" class="projDesc" placeholder="프로젝트 설명" value="${desc}" />
        <input type="url" class="projLink" placeholder="프로젝트 링크 (http:// 또는 https:// 포함)" value="${link}" />
    `;

    projectsInput.insertBefore(newGroup, document.getElementById('addProjectBtn'));
}

// 현재 화면에 표시된 내용을 입력 폼에 채우기
function fillFormWithCurrentData() {
    document.getElementById("inputName").value = document.getElementById("name").textContent;
    document.getElementById("inputBio").value = document.getElementById("bio").textContent;
    document.getElementById("inputEmail").value = document.getElementById("email").textContent;

    // 기존 프로젝트 내용들을 다시 입력폼으로 넣기
    const projectList = document.getElementById("project-list");
    const projectsInput = document.getElementById('projects-input');

    // 프로젝트 입력폼 초기화 (프로젝트 그룹들 다 삭제)
    const existingGroups = projectsInput.querySelectorAll('.project-input-group');
    existingGroups.forEach(group => group.remove());

    // 화면에 표시된 프로젝트 카드들에서 값 가져오기
    const projects = projectList.querySelectorAll('.project');
    if(projects.length === 0) {
        // 입력폼 한 개는 기본 생성
        addProjectInputGroup();
    } else {
        projects.forEach(proj => {
            const title = proj.querySelector('h3')?.textContent || "";
            const desc = proj.querySelector('p')?.textContent || "";
            const link = proj.querySelector('a')?.href || "";
            addProjectInputGroup(title, desc, link);
        });
    }
}

// 제출 및 화면에 표시 함수
function submitUserInfo() {
    const name = document.getElementById("inputName").value.trim();
    const bio = document.getElementById("inputBio").value.trim();
    const email = document.getElementById("inputEmail").value.trim();

    if (!name || !bio || !email) {
        alert("이름, 소개, 이메일은 필수 항목입니다.");
        return;
    }

    document.getElementById("name").textContent = name;
    document.getElementById("footer-name").textContent = name;
    document.getElementById("bio").textContent = bio;

    const emailElem = document.getElementById("email");
    emailElem.href = `mailto:${email}`;
    emailElem.textContent = email;

    // 프로젝트 목록 초기화
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";

    const projectGroups = document.querySelectorAll('.project-input-group');

    projectGroups.forEach(group => {
        const title = group.querySelector('.projTitle').value.trim();
        const desc = group.querySelector('.projDesc').value.trim();
        const link = group.querySelector('.projLink').value.trim();

        if (title) {
            let projectHTML = `<div class="project"><h3>${title}</h3>`;
            if (desc) projectHTML += `<p>${desc}</p>`;

            if (link) {
                const urlPattern = /^https?:\/\//i;
                const validLink = urlPattern.test(link) ? link : "#";
                projectHTML += `<a href="${validLink}" target="_blank" rel="noopener noreferrer">프로젝트 보기</a>`;
            }

            projectHTML += `</div>`;
            projectList.insertAdjacentHTML('beforeend', projectHTML);
        }
    });

    // 모달 닫기 및 수정 버튼 보이기
    document.getElementById("inputModal").style.display = "none";
    document.getElementById("editBtn").style.display = "inline-block";
}
