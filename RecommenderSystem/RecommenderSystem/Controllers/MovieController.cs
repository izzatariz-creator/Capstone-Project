using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecommenderSystem.Data;
using RecommenderSystem.Models;

namespace RecommenderSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MovieDbContext _movieDbContext;

        public MovieController(MovieDbContext movieDbContext)
        {
            _movieDbContext = movieDbContext;
        }

        [HttpGet]
        [Route("GetMovies")]
        public async Task<IEnumerable<Movie>> GetMovies()
        {
            return await _movieDbContext.Movies.ToListAsync();
        }

        [HttpPost]
        [Route("AddMovie")]
        public async Task<Movie> AddMovie(Movie objMovie)
        {
            _movieDbContext.Movies.Add(objMovie);
            await _movieDbContext.SaveChangesAsync();
            return objMovie;
        }

        [HttpPatch]
        [Route("UpdateMovie/{id}")]
        public async Task<Movie> UpdateStudent(Movie objMovie)
        {
            _movieDbContext.Entry(objMovie).State = EntityState.Modified;
            await _movieDbContext.SaveChangesAsync();
            return objMovie;
        }

        [HttpDelete]
        [Route("DeleteMovie/{id}")]
        public bool DeleteMovie(int id)
        {
            bool a = false;
            var movie = _movieDbContext.Movies.Find(id);
            if (movie != null)
            {
                a = true;
                _movieDbContext.Entry(movie).State = EntityState.Deleted;
                _movieDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;
        }
    }
}
