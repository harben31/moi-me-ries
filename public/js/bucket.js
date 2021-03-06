document.getElementById('newSplash_form').style.display = 'none';
document.getElementById('newDrop_form').style.display = 'flex';
document.getElementById('bigSplash').style.display = 'none';

//toggles navbar to photo upload
const navBarToggle = (event) => {
    document.querySelector('#bucketNavBtn').setAttribute('style', 'display: none');
    document.querySelector('#addProfPicBtn').setAttribute('style', 'display: none');
    document.querySelector('#logout').setAttribute('style', 'display: none');

    document.querySelector('#profPicForm').setAttribute('action', `/api/users/pic/${event.target.dataset.user_id}`);
    document.querySelector('#profPicForm').setAttribute('style', 'display: flex');
};

//toggles between the add drop input bar and the add a splash (with photo and description) menu
const toggleFn = (title, list_item_id) => {
    document.getElementById('title').innerHTML = 'Tell us about your ' + title + ' SPLASH adventure:';

    document.querySelector('.newSplash').setAttribute('data-list_item_id', list_item_id);
    document.querySelector('#splashPicForm').setAttribute('action', `/api/listItems/pics/${list_item_id}`);

    document.getElementById('newSplash_form').style.display = 'flex';
    document.getElementById('newDrop_form').style.display = 'none';
};

//makes the short form splashes go away
const splashToggleFn = () =>{
    shortSplash.forEach((splash)=>{
        splash.style.display='none';
    });
    document.getElementById('bigSplash').style.display = 'flex';
};

//adds a drop to db
const addDrop = async () => {
    const title = document.querySelector('.dropItem').value;
    const response = await fetch('/api/listItems', {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.replace('/bucket');
    } else {
        alert(response.statusText);
    }
};

//image POST call made from HTML

//takes data form the create splash menu and the drop that was clicked on and makes new splash
const newSplashBtnFn = async (list_item_id) => {
    const content = document.getElementById('content').value;
    const response = await fetch(`/api/listItems/${list_item_id}`, {
        method: 'PUT',
        body: JSON.stringify({ content }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        document.location.replace('/bucket');
    } else {
        alert(response.statusText);
    }
};

//deletes splash from database
const delSplash = async (list_item_id) => {
    const response = await fetch(`api/listItems/${list_item_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/bucket');
    } else {
        alert(response.statusText);
    }
};

//hides short form splashes then sets the info in the large form splash then switches large form splash display on
const bigSplash = (event) => {
    const dataset = event.target.dataset;

    const itemCall = async () => {
        const response = await fetch(`/api/listItems/${dataset.id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            const shortSplashes=document.querySelectorAll('.shortSplash');

            shortSplashes.forEach((splash) => {
                splash.setAttribute('style','display:none');
            });

            document.querySelector('#delSplashBtn').setAttribute('data-list_item_id', dataset.id);

            const itemData = await response.json();

            document.querySelector('#bigSplashTitle').innerHTML = itemData.title;
            document.querySelector('#bigSplashText').innerHTML = itemData.content;
            document.querySelector('#bigSplashImage').setAttribute('src', itemData.image);
            document.querySelector('#bigSplash').style = 'display:flex';
        } else {
            alert('something went wrong');
        }
    };

    itemCall();
};

//not delegating bc evnt listener overrides built in fn for browsing local files
document.querySelector('#addProfPicBtn').addEventListener('click', (event) => {
    event.preventDefault();
    navBarToggle(event);
});

document.querySelector('#profUpLoadSubBtn').addEventListener('click', () => {
    setTimeout(() => {
        document.location.reload();
    }, 100);
});


//delegates event listener across main section  (right hand column)
document.querySelector('#mainWrap').addEventListener('click', (event) => {
    const target = event.target;
    const list_item_id = target.dataset.list_item_id;

    if(target.matches('.newSplash')){
        newSplashBtnFn(list_item_id);
    } else if(target.matches('.shortSplash') || target.matches('.shortSplashImg')){
        bigSplash(event);
    } else if(target.matches('#newDropBtn')){
        addDrop();
    } else if(target.matches('#delSplashBtn')){
        delSplash(list_item_id);
    }
});

//delegates event listener across the lists (left column)
document.querySelector('#listItemList').addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    const dataset = target.dataset;

    if (target.matches('.splashTitle')){
        bigSplash(event);
    } else if(target.matches('.makeSplash')) {
        toggleFn(dataset.title, dataset.list_item_id);
    }
});