using System;

class CosineSimilarityMatrix
{
    static void Main()
    {
        // Movie Ratings Matrix Definition
        double[][] ratings = {
            // User 1 Ratings For 3 Movies
            new double[] {4,5,2},
            // User 2 Ratings For 3 Movies
            new double[] {5,4,3},
            // User 3 Ratings For 3 Movies
            new double[] {3,2,4},
        };

        // Calls a function named "GetCosineSimilarityMatrix" and passes the Movie Ratings Matrix arrays as an argument
        var similarityMatrix = GetCosineSimilarityMatrix(ratings);

        // Print Cosine Similarity Matrix to Console
        Console.WriteLine("Cosine Similarity Matrix:");
        // Iterate through the rows of the matrix |
        for (int i = 0; i < similarityMatrix.GetLength(0); i++)
        {
            // Iterate through the columns of the matrix --
            for (int j = 0; j < similarityMatrix.GetLength(1); j++)
            {
                Console.Write(similarityMatrix[i, j] + " ");
            }
            Console.WriteLine();
        }

        // Accept 2-dimensional array of doubles (ratings)
        static double[,] GetCosineSimilarityMatrix(double[][] ratings)
        {

            // Assign num of rows in the ratings matrix (num of user)
            int numUsers = ratings.Length;

            // Declare 2-dimensional array of doubles
            double[,] similarityMatrix = new double[numUsers, numUsers];

            // Iterate through the rows of the matrix |
            for (int i = 0; i < numUsers; i++)
            {
                // Iterate through the columns of the matrix --
                for (int j = 0; j < numUsers; j++)
                {
                    // passes the i-th and j-th rows of the "ratings" matrix as arguments
                    similarityMatrix[i, j] = CosineSimilarityBetween(ratings[i], ratings[j]);
                }
            }

            return similarityMatrix;
        }

        // calculates the cosine similarity between these two rows
        static double CosineSimilarityBetween(double[] vector1, double[] vector2)
        {
            // calculate the sum of [Ai * Bi]
            double vectorProduct = VectorProduct(vector1, vector2);
            // calculate the sqrt sum of Ai ^ 2
            double magnitude1 = VectorMagnitude(vector1);
            // calculate the sqrt sum of Bi ^ 2
            double magnitude2 = VectorMagnitude(vector2);

            // Return cosine similarity score between two vectors
            return vectorProduct / (magnitude1 * magnitude2);
        }

        // calculate the product between two vector
        static double VectorProduct(double[] vector1, double[] vector2)
        {
            double vectorproduct = 0;
            for (int i = 0; i < vector1.Length; i++)
            {
                vectorproduct += vector1[i] * vector2[i];
            }
            return vectorproduct;
        }

        // calculate the square root of the vector product 
        static double VectorMagnitude(double[] vector)
        {
            return Math.Sqrt(VectorProduct(vector, vector));
        }
    }
}