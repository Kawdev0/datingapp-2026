using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

// [ApiController]
// [Route("api/[controller]")]
public class AccountController(AppDbContext context) : BaseApiController
{
    [HttpPost("register")] // api/account/register

    public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
     
    {
        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            DisplayName = registerDto.displayName,
            Email = registerDto.email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);

        await context.SaveChangesAsync();

        return user;
    }
}