chmod +x startup.sh
chmod +x run.sh
pip3 install virtualenv
# python3 -m virtualenv -p /local/bin/python3.10 venv
virtualenv -p `which python3.10` venv
chmod +x venv/bin/activate
source venv/bin/activate
pip install -r requirements.txt
./manage.py makemigrations
./manage.py migrate
