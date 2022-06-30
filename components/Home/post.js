import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const postFooterIcons = [
  {
    name:'Like',
    imageURL:'https://img.icons8.com/ios/50/FFFFFF/like--v1.png',
    likedImageURL:'https://img.icons8.com/ios-filled/50/FA5252/like--v1.png'
  },
  {
    name:'Comment',
    imageURL:'https://img.icons8.com/ios/50/FFFFFF/speech-bubble--v1.png'
  },
  {
    name:'Share',
    imageURL:'https://img.icons8.com/ios/50/FFFFFF/sent.png'
  },
  {
    name:'Save',
    imageURL:'https://img.icons8.com/ios/50/FFFFFF/bookmark-ribbon--v1.png',
    bookmarkedImageURL:'https://img.icons8.com/ios-filled/50/FFFFFF/bookmark-ribbon.png'
  }
]

const Post = ({posts}) => {
  return (
    <View style={{marginBottom:30}}>
      <PostHeader post={posts}/>
      <PostImage post={posts}/>
      <View style={{marginHorizontal:15, marginTop:10}}>
        <PostFooter/>
        <Likes post={posts}/>
        <Caption post={posts}/>
        <CommentSection post={posts}/>
        <Comments post={posts}/>
      </View>
    </View>
  )
}

const PostHeader = ({post}) => (
  <View style={{flexDirection:'row',
        justifyContent:'space-between',
        margin:5,
        alignItems:'center'
      }}>

    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Image source={{uri:post.profile_picture}} style={styles.postHeader} />
      <Text style={{color:'white', marginLeft:6, fontWeight:'700'}}>{post.user}</Text>
    </View>

    <View>
      <Text style={{color:'white',lineHeight:8,fontWeight:'bold'}}>⋅</Text>
      <Text style={{color:'white',lineHeight:8,fontWeight:'bold'}}>⋅</Text>
      <Text style={{color:'white',lineHeight:8,fontWeight:'bold'}}>⋅</Text>
    </View>
  </View>
)

const PostImage = ({post}) => (
  <View style={{width:'100%', height:450}}>
    <Image source={{uri:post.imageURL}} style={styles.postImage}/>
  </View>
)

const PostFooter = () => (
  <View style={{flexDirection:'row'}}>
    <View style={styles.leftFooterIcons}>
      <Icon imgStyle={styles.footerIcon} imgURL={postFooterIcons[0].imageURL}/>
      <Icon imgStyle={styles.footerIcon} imgURL={postFooterIcons[1].imageURL}/>
      <Icon imgStyle={styles.footerIcon} imgURL={postFooterIcons[2].imageURL}/>
    </View>

    <View style={{flex:1, alignItems:'flex-end'}}>
      <Icon imgStyle={styles.footerIcon} imgURL={postFooterIcons[3].imageURL}/>
    </View>
  </View>
)

const Icon = ({imgStyle, imgURL}) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{uri:imgURL}}/>
  </TouchableOpacity>
)

const Likes = ({post}) => (
  <View style={{flexDirection:'row', marginTop:4}}>
    <Text style={{color:'white', fontWeight:'600'}}>{
      post.likes > 1_000_000?`${String(post.likes).slice(0,1)}M`: 1_000_000 > post.likes && post.likes > 10000 ?`${String(post.likes).slice(0,2)}K`:post.likes
      } likes</Text>
  </View>
)

const Caption = ({post}) => (
  <View style={{marginTop:5}}>
    <Text style={{color:'white'}}>
      <Text style={{fontWeight:'600'}}>{post.user}</Text>
      <Text>{' '}{post.caption}</Text>
    </Text>
  </View>
)

const CommentSection = ({post}) => (
  <View style={{marginTop:5}}>
    {!!post.comments.length && (
      <Text style={{color:'grey'}}>
        View{post.comments.length > 1 ? ' all' : ''} {post.comments.length} {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
)

const Comments = ({post}) => (
  <>
  {
    post.comments.length < 3 ?
      <>
        {
          post.comments.map((comment, index) => (
            <View key={index} style={{flexDirection:'row', marginTop:5}}>
              <Text style={{color:'white'}}>
                <Text style={{fontWeight:'600'}}>{comment.user}{' '}</Text>
                {comment.comment}
              </Text>
            </View>
          ))
        }
      </>
    :
    <>
      {
        post.comments.slice(0,2).map((comment, index) => (
          <View key={index} style={{flexDirection:'row', marginTop:5}}>
            <Text style={{color:'white'}}>
            <Text style={{fontWeight:'600'}}>{comment.user}{' '}</Text>
              {comment.comment}
            </Text>
            <View>
            </View>
          </View>
        ))
      }
    </>
  }
  </>
)

const styles = StyleSheet.create({
  postHeader:{
    width:35,
    height:35,
    borderRadius:50,
    marginLeft:6,
    borderWidth:1.5,
    borderColor:'#ff8501'
  },
  postImage:{
    height:'100%',
    resizeMode:'cover'
  },
  footerIcon:{
    width:33,
    height:33,
  },
  leftFooterIcons:{
    width:'32%',
    flexDirection:'row',
    justifyContent:'space-between'
  }
})

export default Post