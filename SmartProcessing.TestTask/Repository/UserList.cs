using SmartProcessing.TestTask.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SmartProcessing.TestTask.Repository
{
    public static class UserList
    {
        static List<User> _userList = null;

        static UserList()
        {
            _userList = new List<User>()
            {
                new User { ID = 1, FirstName = "Вася", LastName = "Иванов", Age = 20, Email = "aaa@aa.aa" },
                new User { ID = 2, FirstName = "Петя", LastName = "Петров", Age = 30, Email = "bbb@bb.bb" },
                new User { ID = 3, FirstName = "Женя", LastName = "Сидоров", Age = 40, Email = "ccc@cc.cc" }
            };
        }

        public static List<User> SelectAll()
        {
            return _userList;
        }

        public static User Insert(User user)
        {
            if (user.ID == 0)
            {
                var maxID = _userList.Max(u => u.ID);
                user.ID = ++maxID;
            }
            else
            {
                throw new ArgumentException("UserID must be zero.");
            }

            _userList.Add(user);
            return user;
        }

        public static User Update(User updatedUserData)
        {
            User user = _userList.Find(u => u.ID == updatedUserData.ID);

            if (user == null)
            {
                throw new KeyNotFoundException();
            }

            user.FirstName = updatedUserData.FirstName;
            user.LastName = updatedUserData.LastName;
            user.Age = updatedUserData.Age;
            user.Email = updatedUserData.Email;

            return user;
        }

        public static void Delete(int userId)
        {
            User user = _userList.Find(u => u.ID == userId);

            if (user == null)
            {
                throw new KeyNotFoundException();
            }

            _userList.Remove(user);
        }
    }
}