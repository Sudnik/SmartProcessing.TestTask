using SmartProcessing.TestTask.Models;
using System.Collections.Generic;

namespace SmartProcessing.TestTask.Repository
{
    public class UserRepository : IUserRepository
    {
        public List<User> GetAll()
        {
            return UserList.SelectAll();
        }

        public User GetById(int userId)
        {
            return UserList.SelectAll().Find(u => u.ID == userId);
        }

        public User Insert(User user)
        {
            return UserList.Insert(user);
        }

        public User Update(User user)
        {
            return UserList.Update(user);
        }

        public void Delete(int userId)
        {
            UserList.Delete(userId);
        }
    }
}