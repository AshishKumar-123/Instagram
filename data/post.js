import { USERS } from "./users";

export const POSTS = [
    {
        imageURL:'https://i.ibb.co/182bP1y/4k.png',
        user:USERS[0].user,
        likes:2034,
        caption:'Building the Netflix clone with React JS🚀 This is going to be a fun build #reactjs #firebase #dev',
        profile_picture:USERS[0].image,
        comments:[
            {
                user:'theqazman',
                comment:'Wow! that looks like fire. Super exited about it.'
            },
            {
                user:'amanathsingh',
                comment:'It is really a great build with great enthuasim and work ethics.'
            },
        ]
    },
    {
        imageURL:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        user:USERS[1].user,
        likes:89230,
        caption:"Nature's beauty!! Great View 🙄🥳🤩",
        profile_picture:USERS[1].image,
        comments:[
            {
                user:'jetha',
                comment:'Real beauty of world 🤩'
            },
            {
                user:'sahilsharma',
                comment:'Nice place to visit!! Will be in my next destination list. 🥳🥳'
            },
            {
                user:'tapu',
                comment:'I have visited the place it is most satisfying view I have every seen.'
            }
        ]
    },
    {
        imageURL:'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg',
        user:USERS[2].user,
        likes:58000,
        caption:'Royal Bengal Tiger 🐅!! One of the most legendery animal. 🥶😱',
        profile_picture:USERS[2].image,
        comments:[
            {
                user:'cleverqazi',
                comment:'Most mythical animal I have ever seen.'
            },
            {
                user:'dayababahi',
                comment:'Pride of the 🇮🇳'
            },
            {
                user:'tapu',
                comment:'Fearless and Dangerous animal on 🌏'
            },
            {
                user:'jehta',
                comment:'Wow!! 🤩'
            },
            {
                user:'hardik',
                comment:'Really a majestic animal !!'
            }
        ]
    },
    {
        imageURL:'https://www.imagesource.com/wp-content/uploads/2019/06/Rio.jpg',
        user:USERS[3].user,
        likes:2000000,
        caption:'What a Scenery !! 🥰',
        profile_picture:USERS[3].image,
        comments:[
            {
                user:'tapu',
                comment:'Nice angle !!'
            },
            {
                user:'dayababhi',
                comment:'What what a view of city !!'
            }
        ]
    }
]