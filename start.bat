@echo off
setlocal
chcp 65001 >nul
title 모아 - 로컬 학습 서버
cd /d "%~dp0"
if errorlevel 1 goto folder_error

if not exist "app.py" goto project_error
if not exist "requirements.txt" goto project_error
if not exist "templates\index.html" goto project_error
if not exist "static\styles.css" goto project_error
if not exist "static\app.js" goto project_error

echo [모아] Python 실행 환경을 확인합니다...
if not exist ".venv\Scripts\python.exe" goto find_python
".venv\Scripts\python.exe" -c "import sys; sys.exit(0 if sys.version_info >= (3, 9) else 1)" >nul 2>&1
if errorlevel 1 goto venv_error
goto activate_venv

:find_python
py -3 -c "import sys; sys.exit(0 if sys.version_info >= (3, 9) else 1)" >nul 2>&1
if not errorlevel 1 (
  set "MOA_PYTHON=py -3"
  goto python_ready
)
python -c "import sys; sys.exit(0 if sys.version_info >= (3, 9) else 1)" >nul 2>&1
if not errorlevel 1 (
  set "MOA_PYTHON=python"
  goto python_ready
)
echo [오류] Python 3.9 이상을 찾을 수 없습니다.
echo https://www.python.org/downloads/ 에서 Python을 설치하고 Add Python to PATH를 선택해 주세요.
goto failed

:python_ready
if not exist ".venv\Scripts\python.exe" (
  echo [모아] 가상환경 .venv를 만듭니다...
  %MOA_PYTHON% -m venv .venv
  if errorlevel 1 goto venv_error
)

:activate_venv
call ".venv\Scripts\activate.bat"
if errorlevel 1 goto venv_error
if not exist "requirements.txt" goto requirements_error
if not exist ".venv\installed-requirements.txt" goto install
fc /b "requirements.txt" ".venv\installed-requirements.txt" >nul 2>&1
if errorlevel 1 goto install
".venv\Scripts\python.exe" -c "import flask; from importlib.metadata import version; v=tuple(map(int,version('Flask').split('.')[:2])); assert (3,1) <= v < (4,0)" >nul 2>&1
if errorlevel 1 goto install
".venv\Scripts\python.exe" -m pip check >nul 2>&1
if errorlevel 1 goto install
echo [모아] 필요한 라이브러리가 준비되어 있습니다.
goto run

:install
echo [모아] 필요한 라이브러리를 설치합니다. 처음에는 인터넷 연결이 필요합니다.
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 goto install_error
copy /y "requirements.txt" ".venv\installed-requirements.txt" >nul
if errorlevel 1 goto install_error

:run
echo [모아] 프로젝트: %~dp0
echo [모아] http://127.0.0.1:5000/ 에서 서버를 시작합니다.
echo 실행 중인 Flask 확인 후 브라우저를 엽니다. 종료하려면 이 창에서 Ctrl+C를 누르세요.
echo [중요] 모아를 사용하는 동안 이 창을 열어 두세요.
echo 이 창을 닫으면 서버가 종료되어 브라우저에 ERR_CONNECTION_REFUSED가 표시될 수 있습니다.
"%~dp0.venv\Scripts\python.exe" -u "%~dp0app.py" --open-browser
if errorlevel 1 goto server_error
echo [모아] 서버가 종료되었습니다. 브라우저에서 새로고침하면 연결할 수 없습니다.
pause
exit /b 0

:folder_error
echo [오류] 프로젝트 폴더를 열 수 없습니다.
goto failed
:venv_error
echo [오류] 가상환경 생성 또는 활성화에 실패했습니다. Python 설치와 폴더 권한을 확인해 주세요.
echo 기존 .venv는 자동으로 삭제하거나 덮어쓰지 않습니다.
goto failed
:project_error
echo [오류] 웹사이트 실행에 필요한 파일을 찾을 수 없습니다.
echo start.bat, app.py, requirements.txt, templates\index.html,
echo static\styles.css, static\app.js가 같은 프로젝트 폴더 구조에 있는지 확인하세요.
goto failed
:requirements_error
echo [오류] requirements.txt가 없습니다. start.bat과 같은 폴더에 두세요.
goto failed
:install_error
echo [오류] 라이브러리 설치에 실패했습니다. 위 오류와 인터넷 연결을 확인해 주세요.
goto failed
:server_error
echo [오류] 서버를 시작하지 못했습니다. 위 오류를 확인해 주세요.
echo 포트 5000을 다른 프로그램이 사용 중이면 해당 프로그램을 종료한 뒤 다시 실행하세요.
:failed
echo 이 창의 오류를 확인한 뒤 다시 실행해 주세요.
pause
exit /b 1
