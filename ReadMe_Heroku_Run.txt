heroku login

# only to create new app : heroku create ai-sentiment-analysis
heroku git:remote -a ai-sentiment-analysis

heroku local web -f Procfile.windows

heroku builds -a ai-image-process # take note of the build ID you'd want to display
heroku builds:cancel 26351046-6fa0-49ad-8f59-ae3149bbae2f -a ai-image-process


git init
git add .
git commit -m "Ai Bot"
git push heroku master

