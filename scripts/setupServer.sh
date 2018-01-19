#Set ssh keys

MY_SSH_PUBLIC_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCoaKeJLw6KHrhLfOP+ieSH14+liqIF71rgToZ1Ym1IGD1r4seWm8MBmojlQ13gvEQPLSPxkuOn/dOL6pHqN8NT6MHT7etuEwznjxScMkygIir0U1mip08FMwZEHav2sHHturTo7uKfRo0qLkZvpcqgMryFBmuYZUgVnpdGiBpzjfA9eUfVKyB01nmr51qbsFW96YcZU4cfGvRvgm2DqZoqc7bSLCy2AiJelz0lbLDL9zTqs0WojxR6TwvnVa3oWFBoF7mTiAcXn9l7B4OktMvdmFeMPfPy6Cgtf0req6opVpXWRoijRsSzUz6bAFEoYlucc3iStwZn9WAb8BLzCJRx jonas@Jonass-MacBook-Air.local"
mkdir -p ~/.ssh/
echo $MY_SSH_PUBLIC_KEY > ~/.ssh/authorized_keys

# Install docker

sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce


echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get update
apt-get install -y mongodb-org-shell


#install mongo container
docker run --name mongo_instance -d mongo:3.4

# Create text index on collection
# db.collection.createIndex( { "$**": "text" } )

#Lisen on ports:








