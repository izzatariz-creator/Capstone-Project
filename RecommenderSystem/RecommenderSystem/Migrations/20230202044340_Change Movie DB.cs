using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecommenderSystem.Migrations
{
    /// <inheritdoc />
    public partial class ChangeMovieDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PosterPath",
                table: "Movies");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PosterPath",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
