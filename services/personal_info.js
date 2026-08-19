const personal_info = require('../models/personal_info');

const getProfile = async () => {
    const result = await personal_info.getProfile();

    return result;
}

const updateProfile = async (body) => {
    if(!body.full_name || !body.title || !body.bio || !body.email){
        throw new Error('Fullname, Title, Bio, Email is required');
    }

    let profile = await personal_info.getProfile();
    if(profile.length == 0){
        throw new Error('Profile Not Found');
    }

    let id = profile[0].id;
    await personal_info.updateProfile(id, body);
    let data = await personal_info.getProfile();

    return data;
}

module.exports = {
    getProfile,
    updateProfile
}