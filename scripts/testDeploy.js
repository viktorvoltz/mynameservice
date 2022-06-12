const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("voltz");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    let txn = await domainContract.register("chi",  {value: hre.ethers.utils.parseEther('0.3')});
    await txn.wait();
    console.log("Minted chi.voltz");
  
    txn = await domainContract.setRecord("chi", "voltz");
    await txn.wait();
    console.log("Set record for chi.voltz");
  
    const address = await domainContract.getAddress("chi");
    console.log("Owner of chi.voltz:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();