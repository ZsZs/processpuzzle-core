rm -fr build
mkdir build
cp ../processpuzzle-core-services/target/processpuzzle-core.jar build
docker build -t zsuffazs/processpuzzle-core .
docker volume create --name=processpuzzle-logs
winpty docker run -it -p 9125:9125 --volume=processpuzzle-logs:/var/log/processpuzzle-core/ --name processpuzzle-core zsuffazs/processpuzzle-core