using SmartProcessing.TestTask.Models;
using SmartProcessing.TestTask.Repository;
using System;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SmartProcessing.TestTask.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        readonly IUserRepository _userRepository;

        public UsersController()
        {
            _userRepository = new UserRepository();
        }

        // GET: api/Users
        public IHttpActionResult Get()
        {
            return Ok(_userRepository.GetAll());
        }

        // GET: api/Users/5
        public IHttpActionResult Get(int id)
        {
            var user = _userRepository.GetById(id);

            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(user);
            }
        }

        // POST: api/Users
        public IHttpActionResult Post([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var newUser = _userRepository.Insert(user);
            return Ok(newUser);
        }

        // PUT: api/Users/5
        public IHttpActionResult Put(int id, [FromBody] User user)
        {
            if (id != user.ID || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var updatedUser = _userRepository.Update(user);
            return Ok(updatedUser);
        }

        // DELETE: api/Users/5
        public IHttpActionResult Delete(int id)
        {
            _userRepository.Delete(id);
            return Ok();
        }
    }
}
