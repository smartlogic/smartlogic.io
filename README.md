# Welcome to the SmartLogic Solutions website


## Instructions for New Employees

To add a new employee to the team page, please follow these instructions:
1. Add a 210x140 pixel .png image of yourself to `images\team\<YOUR FIRST NAME>.png`
2. Add a .html file to `_includes/team/<YOUR FIRST NAME>.html` with your whichever social media links you wish to list.  You may use Yair's as an example.
3. Add a folder for yourself in the root directory named <YOUR FIRST NAME>.  In that folder, add a .html file in one of the two options:
  - If you do not wish to add a bio description for yourself, simplify add this to the `index.html` file (filling in your name where appropriate):
    <html>
      <head>
        <meta http-equiv="Refresh" content="0;url=http://www.smartlogicsolutions.com/team.html#<YOUR FIRST NAME>" />
      </head>
      <body>
      </body>
    </html>
  - If you wish to add a bio description for yourself, reference a similar page such as `dan\index.html` for a formatting template
4. Modify `team.html` to include your a link to your bio (even if you did't add any content) in this format: `{% include team/<YOUR FIRST NAME>.html %}`.  Please note: the list is organized *alphabetically by last name*.
5. For each team member who has content on their bio page, include a link to your bio in the same format as the team.html page (note the ordering as well).  Modify the relevant bio pages by editing the `index.html` file in their individual folders.
