# NauqanApp

# для миграции из метки в мастер
git checkout develop
git merge -s ours master
git checkout master
git merge develop