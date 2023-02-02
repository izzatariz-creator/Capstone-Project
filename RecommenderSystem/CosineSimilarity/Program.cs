using System;

class CosineSimilarityMatrix
{
    static void Main()
    {
        // Movie Ratings Matrix Definition
        double[][] ratings = {
            // User 1 Ratings
            new double[] {4,5,2},
            // User 2 Ratings
            new double[] {5,4,3},
            // User 3 Ratings
            new double[] {3,2,4},
            // User 4 Ratings
            new double[] {5,4,1},
            // User 5 Ratings
            new double[] {3,2,5},
            // User 6 Ratings
            new double[] {4,5,2},
            // User 7 Ratings
            new double[] {0,1,2},
        };

        double maxSimilarity = 0;
        int[] mostSimilarMovies = new int[5];
        double[] maxSimilarities = new double[5];
        int count = 0;

        // Calls a function named "GetCosineSimilarityMatrix" and passes the Movie Ratings Matrix arrays as an argument
        var similarityMatrix = GetCosineSimilarityMatrix(ratings);

        Console.WriteLine("------------------------------------------------------------------------------------------------------------------------------------");

        // Print Cosine Similarity Matrix to Console
        Console.WriteLine("Cosine Similarity Matrix:\n");
        // Iterate through the rows of the matrix |
        for (int i = 0; i < similarityMatrix.GetLength(0); i++)
        {
            count++;
            Console.Write($"Movie {count}   " );
            // Iterate through the columns of the matrix --
            for (int j = 0; j < similarityMatrix.GetLength(1); j++)
            {
                
                Console.Write(similarityMatrix[i, j] + " ");
            }
            Console.WriteLine();
        }

        for (int i = 0; i < 5; i++)
        {
            maxSimilarities[i] = 0;
        }

        for (int j = 0; j < similarityMatrix.GetLength(0); j++)
        {
            if (j == 0) continue; // Skip the first movie
            double currentSimilarity = similarityMatrix[0, j];
            if (currentSimilarity > maxSimilarity)
            {
                for (int i = 0; i < 5; i++)
                {
                    if (currentSimilarity > maxSimilarities[i])
                    {
                        for (int k = 4; k > i; k--)
                        {
                            maxSimilarities[k] = maxSimilarities[k - 1];
                            mostSimilarMovies[k] = mostSimilarMovies[k - 1];
                        }
                        maxSimilarities[i] = currentSimilarity;
                        mostSimilarMovies[i] = j;
                        break;
                    }
                }
            }
        }

        Console.WriteLine("------------------------------------------------------------------------------------------------------------------------------------");

        Console.WriteLine("The 5 most similar movies to the first movie are:\n");
        for (int i = 0; i < 5; i++)
        {
            Console.WriteLine("Movie " + (mostSimilarMovies[i] + 1) + " with a cosine similarity score of " + maxSimilarities[i]);
        }
        Console.WriteLine("------------------------------------------------------------------------------------------------------------------------------------");

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