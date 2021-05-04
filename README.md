# To do list

A basic to do list using vanilla JS. This is the first assignment in Javascript at Medieinstitutet. 

## Demo
https://sophie-todolist-vanillajs.netlify.app/

## Credit
Big thanks to [rmRadev at Deviantart](https://www.deviantart.com/rmradev) for the background image.

## Functionality

- 6 predefined tasks
- Uses LocalStorage to store tasks. Uses tasks from localStorage if there are any, else the predefined tasks will be rendered.
- Possibility to add new tasks
- Removal of tasks by clicking the cross icon
- Completing tasks by checking them
- Marking tasks as unfinished again after completing them by unchecking them

## Requirements

- git
- node
- sass
- gulp
- gulp-sass
- gulp-watch
- gulp-rename
- gulp-csso

##  Install & run

Clone the repo and install the dependencies before opening index.html:

```
git clone https://github.com/sophie-akesson/to-do-list.git
```

```
npm i
```

Make sure to use Chrome if you run the project in a local environment. Chrome is at the time (10/11/2020) the only browser which allows use of LocalStorage locally.

## Folder struture

```
index.html
├── assets
├── css
├── js
├── node_modules
│   └── modules
├── scss
```

New files should be put in a corresponding folder. Use assets for files that do not have any corrisponding folder.

## Naming conventions

The project uses camelCase for variables, ids and function names. PascalCase is used for class names.

Longer and describing variable names are preferred, such as:

```
let addTaskButton;
```
