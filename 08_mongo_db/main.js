const users = require('./users');
const User = require('./user');

(async () => {

    console.log('Using mongodb');

    (await users._getUsersDb()).drop();

    console.log(await users.getUsers());

    await users.create({
        name: 'victor',
        age: 30,
        phones: ['30003030303', "30003030304"]
    });

    const usersList = await users.getUsers();
    const user = usersList[0];

    console.log(await users.getUser(user._id));

    await users.update(user._id, {age: 31});

    console.log(await users.getUser(user._id));

    await users.delete(user._id);

    console.log(await users.getUsers());

    console.log('-----------------------------------');

    console.log('using mongoose');

    await User.deleteMany({});
    console.log(await User.find());


    const newUser = new User({
        name: 'victor',
        age: 30,
        phones: ['30003030303', "30003030304"]
    });

    await newUser.save();

    const usersListM = await User.find();

    let newFoundUser = await User.findOne({_id: usersListM[0]._id});

    console.log(newFoundUser);

    newFoundUser.age = 31;
    await newFoundUser.save();

    newFoundUser = await User.findOne({_id: usersListM[0]._id});

    console.log(newFoundUser);

    await newFoundUser.delete();

    console.log(await User.find());

    process.exit();
})();
