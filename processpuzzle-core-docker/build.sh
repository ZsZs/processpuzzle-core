rm -fr build
mkdir build
cp ../processpuzzle-core-services/target/processpuzzle-core.jar build
docker build -t zsuffazs/processpuzzle-core .
docker run -d -p 9125:9125 --name processpuzzle-core zsuffazs/processpuzzle-core