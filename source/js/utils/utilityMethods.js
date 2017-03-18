export default {

    CURRENT_USER_KEY:'currentUser',

    saveUserSession: function(userObject){
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userObject));
    },

    removeUserSession: function(){
        localStorage.removeItem(this.CURRENT_USER_KEY);
    },

    getUserSession: function(){
        return localStorage.getItem(this.CURRENT_USER_KEY);
    }
}