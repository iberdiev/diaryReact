# School Diary Project (front, React)
###
This project is done during 1 month of winter internship. With my fellows, we've tried to build an online gradebook. By the time we were working on this project, we didn't know that it's better to separate each module using django apps, so do not judge strictly.

Platform has 3 types of users:
  1. School administration: responsible for cohors, timetable, assigning teachers.
  2. Teachers: put grades and comments on students.
  3. Parents: monitoring grades of his children.
###
## Usage (locally, not for production)
1. Create a virtual environment with python3.7
```
virtualenv --python=/usr/bin/python3.7 myvenv
```
2. Activate virtual environment (for OS Linux)
```
. myvenv/bin/activate
```
3. Download the project
```
git clone https://github.com/mk-dir-AZATOT/diary 
```
4. Open needed directory
```
cd diary
```

5. Install all required components
```
pip install -r requirements.txt
```
6. Run django server through manage.py
```
python manage.py runserver
```
### To start react

1. Go to "project" directory
```
cd project
```
2. Install the npm modules
```
npm install
```
3. Start the app on localhost
```
npm start
```

