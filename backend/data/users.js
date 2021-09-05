import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Sam',
        password: bcrypt.hashSync('pass1', 10),
        email: 'sam@example.com',
    },
    {
        name: 'Pam',
        password: bcrypt.hashSync('pass2', 10),
        email: 'pam@example.com',
    },
    {
        name: 'Lam',
        password: bcrypt.hashSync('pass3', 10),
        email: 'lam@example.com',
    },
    {
        name: 'Saurabh',
        password: bcrypt.hashSync('admin123', 10),
        email: 'saurabh@example.com',
        isAdmin: true,
    },
]

export default users
