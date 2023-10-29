using SmartProcessing.TestTask.Models;
using System.Collections.Generic;

namespace SmartProcessing.TestTask.Repository
{
    internal interface IUserRepository
    {
        List<User> GetAll();
        User GetById(int userId);
        User Insert(User user);
        User Update(User user);
        void Delete(int userId);
    }
}
