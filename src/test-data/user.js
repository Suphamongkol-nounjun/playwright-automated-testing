const validUser =[
    {
        username:"standard_user",
        password:"secret_sauce",
    },
    {
        username:"problem_user",
        password:"secret_sauce",
    },
    {
        username:"performance_glitch_user",
        password:"secret_sauce",
    },
];

const invalidUser =[
    {
        username:"locked_out_user",
        password:"secret_sauce",
    },
    {
        username:"testt_user",
        password:"secret_sauce",
    },
];
module.exports = {
    validUser,
    invalidUser,
}