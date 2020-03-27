using System;
using Xunit;

namespace Tests
{
// Please Note:    
//     Given the current state of the project there are very few methods
//     that can be tested without calling the api or changing db data. 

// The purpose of the test below is to show naming conventions / structure.


    public class OtherServiceShould
    {
        [Fact]
        public void ReturnTrue()
        {
            Assert.True(true);

        }
    }
}
