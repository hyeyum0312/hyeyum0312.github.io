# Hyenii.log

> 생각은 기획자처럼, 구현은 개발자답게.

프론트엔드 개발자 조혜연의 기술 블로그이자, 같은 데이터로 이력서와 포트폴리오를 함께 만드는 저장소입니다.

- 블로그: https://hyeyum0312.github.io
- 이력서: https://hyeyum0312.github.io/resume/
- 포트폴리오: https://hyeyum0312.github.io/portfolio/

## 이 저장소에서 한 것

블로그 테마 위에 이력서와 포트폴리오를 직접 설계해 올렸습니다. 내용을 고칠 때 여러 곳을 따로 손대지 않도록, **데이터 한 곳을 바꾸면 세 페이지와 PDF가 함께 바뀌는 구조**로 만들었습니다.

| 기능 | 설명 |
|---|---|
| 데이터 기반 생성 | 경력 · 프로젝트 · 케이스 스터디를 `_data/*.yml`에 두고, 이력서 · 포트폴리오 · About이 같은 데이터를 읽습니다 |
| PDF 자동 생성 | `npm run pdf`로 이력서(A4)와 포트폴리오(1280×720 슬라이드) PDF를 Playwright로 만듭니다 |
| 슬라이드 넘침 검사 | PDF를 만들 때 내용이 슬라이드 밖으로 넘치면 몇 번째 장이 몇 px 넘치는지 알려 줍니다 |
| 개인정보 분리 | 전화번호 · 실제 사진 · 학력 · 회사 실명은 git에 올리지 않는 `_data/private.yml`에만 두고, 로컬 PDF에만 넣습니다. 공개 사이트에는 나가지 않습니다 |
| 경력 자동 계산 | 재직 기간으로 총 경력을 계산합니다. 빌드 시점에 한 번, 페이지를 연 날짜 기준으로 한 번 더 계산합니다 |
| 출력 · 화면 겸용 이력서 | 링크는 주소를 글자로 함께 보여 주고, 인쇄할 때 제목이 쪽 끝에 혼자 남지 않게 했습니다 |
| 링크 공유 미리보기 | 블로그 · 이력서 · 포트폴리오마다 공유용 이미지와 제목을 둡니다 |

## 구조

```text
_data/
  profile.yml     소개 · 슬로건 · 기술 스택 · 업무 강점 · AI 활용
  career.yml      회사별 재직 기간과 요약
  projects.yml    프로젝트별 기간 · 인원 · 업무 · 성과
  cases.yml       포트폴리오 케이스 스터디 (문제 · 해결 · 화면 · 핵심 로직 · 결과)
  private.yml     개인정보 (git 제외, private.example.yml 참고)
_layouts/
  resume.html     이력서 (문서형, A4)
  portfolio.html  포트폴리오 (16:9 슬라이드)
  about.html      블로그 소개
_includes/cv/     이력서 · 포트폴리오가 함께 쓰는 조각 (케이스 슬라이드, 경력, 연락처 등)
_sass/custom/     이력서 · 포트폴리오 스타일과 인쇄 스타일
_posts/           블로그 글
scripts/pdf.mjs   PDF 생성 스크립트
```

## 실행

```bash
bundle install
bundle exec jekyll serve      # 로컬 미리보기

npm install
npm run pdf                   # pdf/ 폴더에 이력서 · 포트폴리오 PDF 생성
```

`_data/private.yml`이 없으면 개인정보 없이 공개 버전으로 PDF를 만듭니다.

## 크레딧

[Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) 테마(MIT)를 기반으로 합니다. 커밋 기록의 초기 부분은 테마의 기록입니다.
