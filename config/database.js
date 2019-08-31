if(process.env.NODE_ENV==='production'){
    module.exports={mongoURI:
    'mongodb+srv://socomu:socomu@socomu-0up4r.mongodb.net/test?retryWrites=true&w=majority'}
}
else{
    module.exports={mongoURI:
    'mongodb://localhost/socomudb'}
}